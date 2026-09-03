import { LinkedInIcon, XIcon, YouTubeIcon, InstagramIcon } from "@/components/icons/SocialIcons";

// Verified against the live site's own Yoast structured data (Person.sameAs)
// rather than guessed — these differ from what was here before (no "s" in
// "mattaskumar", a different LinkedIn path, and a channel-ID YouTube URL).
export const SOCIALS = [
  { href: "https://www.linkedin.com/in/mattakumar/", label: "LinkedIn", icon: LinkedInIcon },
  { href: "https://x.com/mattaskumar", label: "X / Twitter", icon: XIcon },
  { href: "https://www.youtube.com/@mattaskumar", label: "YouTube", icon: YouTubeIcon },
  { href: "https://www.instagram.com/mattaskumar/", label: "Instagram", icon: InstagramIcon },
];
