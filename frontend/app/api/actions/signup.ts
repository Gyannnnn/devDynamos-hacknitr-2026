import axios from "axios";

export const Signup = async ({
    name,
    email,

    collegeId,
    location,
    fieldOfExpertise,
    description,
    about,
    role,
    instagram,
    linkedIn,

    materialLinks }: {
        name: string,
        email: string,
        password: string,


        collegeId: string,

        location: string,
        fieldOfExpertise: string,
        description: string,
        about: string,
        role: string,
        instagram: string,
        linkedIn: string,

        materialLinks: string[]
    }) => {
    try {
        const res = await axios.post(
            "https://localhost:8080/api/v1/auth/signup", {
            name,
            email,
   


            collegeId,

            location,
            fieldOfExpertise,
            description,
            about,
            role,
            instagram,
            linkedIn,

            materialLinks
        }
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};