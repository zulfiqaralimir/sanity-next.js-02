import { groq } from "next-sanity";
import { client } from "./client";

export async function getProfile() {
  return client.fetch(groq`*[_type == 'profile']{
        _id,
        fullName,
        headline,
        profileImage { "image": asset->url, alt},
        shortBio,
        location,
        fullBio,
        email,
        "resumeURL": resumeURL.asset->url,
        socialLinks {github, linkedin, twitter, twitch},
        skills
    }`);
}

export async function getJob() {
  return client.fetch(
    groq`*[_type == "job"]{
      _id,
      description,
      endDate,
      jobTitle,
      "logo": logo.asset->url,
      name,
      startDate,
      url,
    }`
  );
}

export async function getSingleProject(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      name,
      coverImage { alt, "image": asset->url },
      projectUrl,
      tagline,
      description
    }`,
    { slug }
  );
}

export async function getProjects() {
  return client.fetch(
    groq`*[_type == "project"]{
      _id, 
      "logo": logo.asset->url,
      name,
      "slug": slug.current,
      tagline,
    }`
  );
}