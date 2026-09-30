import Image from "next/image";
import TiltCard from "./TiltCard";
import { LinkedInIcon } from "./Icons";
import type { TeamMember } from "@/lib/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <TiltCard className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-shadow duration-300 hover:shadow-lift">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-brand-700 to-navy">
        {member.photo ? (
          <Image
            src={member.photo.src}
            alt={member.name}
            width={member.photo.width}
            height={member.photo.height}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-4xl font-extrabold text-white/90">
              {initials(member.name)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-lg font-bold text-navy">{member.name}</h3>
            <p className="text-sm font-medium text-brand-700">{member.role}</p>
          </div>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full bg-mist-100 text-brand-700 transition-colors duration-200 hover:bg-brand-600 hover:text-white"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
          )}
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{member.bio}</p>
      </div>
    </TiltCard>
  );
}
