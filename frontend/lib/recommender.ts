// Pure content-based mentor recommender
// Inputs: student profile and a list of mentors (can be the existing Mentor objects)
// Output: top N mentors with matchPercentage and brief explanation

export type Level = "beginner" | "intermediate" | "advanced";

export type LearningStyle =
  | "visual"
  | "auditory"
  | "reading"
  | "kinesthetic"
  | "mixed";

export interface StudentProfile {
  id?: string;
  goals: string[]; // concrete goals/topics the student wants to achieve
  level: Level;
  interests: string[]; // broader interests / skills
  learningStyle?: LearningStyle;
}

export interface MentorProfile {
  id: string;
  name?: string;
  expertise: string[]; // topics/skills the mentor can teach
  experienceLevel: Level;
  teachingStyle?: LearningStyle | LearningStyle[];
  rating: number; // 0-5
}

export interface MatchResult {
  mentor: MentorProfile;
  matchPercentage: number; // 0-100
  breakdown: {
    goalMatch: number;
    skillOverlap: number;
    levelCompatibility: number;
    ratingScore: number;
    learningStyleMatch: number;
  };
  explanation: string;
}

function levelToNumber(l: Level) {
  return l === "beginner" ? 1 : l === "intermediate" ? 2 : 3;
}

function normalizeArray(arr?: string[]) {
  return (arr || []).map((s) => s.trim().toLowerCase()).filter(Boolean);
}

/**
 * Recommend mentors using weighted content matching.
 * Weights (configurable inside):
 *  - goalMatch: 40%
 *  - skillOverlap: 30%
 *  - levelCompatibility: 15%
 *  - ratingScore: 10%
 *  - learningStyleMatch: 5%
 *
 * The function is pure and deterministic.
 */
export function recommendMentors(
  student: StudentProfile,
  mentors: MentorProfile[],
  topN = 3
): MatchResult[] {
  const weights = {
    goalMatch: 0.4,
    skillOverlap: 0.3,
    levelCompatibility: 0.15,
    ratingScore: 0.1,
    learningStyleMatch: 0.05,
  };

  const studentGoals = normalizeArray(student.goals);
  const studentInterests = normalizeArray(student.interests);
  const studentLevelNum = levelToNumber(student.level);
  const studentStyle = student.learningStyle;

  const results = mentors.map((m) => {
    const expertise = normalizeArray(m.expertise);

    // Goal match: proportion of student's goals covered by mentor expertise
    const matchedGoals = studentGoals.filter((g) => expertise.includes(g));
    const goalMatchScore =
      studentGoals.length > 0 ? matchedGoals.length / studentGoals.length : 0;

    // Skill overlap: intersection over student's interests
    const matchedSkills = studentInterests.filter((s) => expertise.includes(s));
    const skillOverlapScore =
      studentInterests.length > 0
        ? matchedSkills.length / studentInterests.length
        : 0;

    // Level compatibility: closer is better, mentors equal or more experienced preferred
    const mentorLevelNum = levelToNumber(m.experienceLevel);
    const levelDiff = Math.abs(mentorLevelNum - studentLevelNum);
    const levelCompatibilityScore = Math.max(0, 1 - levelDiff / 2); // maps diff 0->1,1->0.5,2->0

    // Rating score: scaled 0..1 from 0..5
    const ratingScore = Math.max(0, Math.min(5, m.rating)) / 5;

    // Learning style match: exact or included in mentor teaching style
    let learningStyleMatchScore = 0;
    if (studentStyle) {
      const mentorStyles = Array.isArray(m.teachingStyle)
        ? (m.teachingStyle as string[])
        : m.teachingStyle
        ? [m.teachingStyle as string]
        : [];
      const normMentorStyles = mentorStyles.map((s) => s.toLowerCase());
      if (normMentorStyles.includes("mixed")) learningStyleMatchScore = 1;
      else if (studentStyle && normMentorStyles.includes(studentStyle))
        learningStyleMatchScore = 1;
      else learningStyleMatchScore = 0;
    }

    // Weighted sum
    const weighted =
      goalMatchScore * weights.goalMatch +
      skillOverlapScore * weights.skillOverlap +
      levelCompatibilityScore * weights.levelCompatibility +
      ratingScore * weights.ratingScore +
      learningStyleMatchScore * weights.learningStyleMatch;

    const matchPercentage = Math.round(weighted * 100);

    const breakdown = {
      goalMatch: Math.round(goalMatchScore * 100),
      skillOverlap: Math.round(skillOverlapScore * 100),
      levelCompatibility: Math.round(levelCompatibilityScore * 100),
      ratingScore: Math.round(ratingScore * 100),
      learningStyleMatch: Math.round(learningStyleMatchScore * 100),
    };

    const explanationParts: string[] = [];
    explanationParts.push(`Goals: ${breakdown.goalMatch}%`);
    explanationParts.push(`Skills: ${breakdown.skillOverlap}%`);
    explanationParts.push(`Level: ${breakdown.levelCompatibility}%`);
    explanationParts.push(`Rating: ${breakdown.ratingScore}%`);
    if (studentStyle)
      explanationParts.push(`Learning style: ${breakdown.learningStyleMatch}%`);

    const explanation = explanationParts.join(" · ");

    return {
      mentor: m,
      matchPercentage,
      breakdown,
      explanation,
    } as MatchResult;
  });

  // Sort descending by matchPercentage and return top N
  return results
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, topN);
}

// Usage note: keep data normalized. If you have existing Mentor type with single `field` string,
// map it to MentorProfile by using `expertise: [mentor.field, ...additionalTags]` before calling.
