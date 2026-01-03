"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { Mentor } from "@/lib/data"
import { format } from "date-fns"

export function ScheduleDialog({ mentor }: { mentor: Mentor }) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [open, setOpen] = useState(false)

  const handleSchedule = () => {
    if (date) {
      alert(`Session scheduled with ${mentor.name} on ${format(date, "PPP")}`)
      setOpen(false)
      setDate(undefined)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CalendarIcon className="h-4 w-4 mr-2" />
          Schedule a Session
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule a Session with {mentor.name}</DialogTitle>
          <DialogDescription>
            Select a date for your mentoring session
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
          {date && (
            <div className="w-full">
              <p className="text-sm text-muted-foreground mb-2">
                Selected: {format(date, "PPP")}
              </p>
              <Button onClick={handleSchedule} className="w-full">
                Confirm Schedule
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

