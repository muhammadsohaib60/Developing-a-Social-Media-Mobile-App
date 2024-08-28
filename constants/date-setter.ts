import { user } from "./images";

export const setStories = () => {
  return [
    { id: "1", isAddNew: true },
    { id: "2", imageUrl: user },
    { id: "3", imageUrl: user },
    { id: "4", imageUrl: user },
    { id: "5", imageUrl: user },
    { id: "6", imageUrl: user },
    { id: "7", imageUrl: user },
    { id: "8", imageUrl: user },
    { id: "9", imageUrl: user },
  ];
};

export const setUsersInSearch = (tab: string) => {
  if (tab === "Accounts") {
    return [
      {
        id: "1",
        name: "Aimon",
        location: "Lahore, Pakistan",
        imageUrl: user,
      },
      {
        id: "2",
        name: "Alisa",
        location: "Dubai, UAE",
        imageUrl: user,
      },
      {
        id: "3",
        name: "Maani",
        location: "California, USA",
        imageUrl: user,
      },
      {
        id: "4",
        name: "Monte",
        location: "Karachi, Pakistan",
        imageUrl: user,
      },
    ];
  } else if (tab === "Tribes") {
    return [
      {
        id: "1",
        name: "Sara",
        location: "New York, USA",
        imageUrl: user,
      },
      {
        id: "2",
        name: "Bilal",
        location: "Islamabad, Pakistan",
        imageUrl: user,
      },
      {
        id: "3",
        name: "Zara",
        location: "Toronto, Canada",
        imageUrl: user,
      },
      {
        id: "4",
        name: "John",
        location: "Sydney, Australia",
        imageUrl: user,
      },
    ];
  } else if (tab === "Posts") {
    return [
      {
        id: "1",
        name: "Nina",
        location: "Berlin, Germany",
        imageUrl: user,
      },
      {
        id: "2",
        name: "Ali",
        location: "Cairo, Egypt",
        imageUrl: user,
      },
      {
        id: "3",
        name: "Leo",
        location: "London, UK",
        imageUrl: user,
      },
      {
        id: "4",
        name: "Ella",
        location: "Madrid, Spain",
        imageUrl: user,
      },
    ];
  } else if (tab === "Tags") {
    return [
      {
        id: "1",
        name: "Ravi",
        location: "Delhi, India",
        imageUrl: user,
      },
      {
        id: "2",
        name: "Maria",
        location: "Rio de Janeiro, Brazil",
        imageUrl: user,
      },
      {
        id: "3",
        name: "Chen",
        location: "Beijing, China",
        imageUrl: user,
      },
      {
        id: "4",
        name: "Fatima",
        location: "Riyadh, Saudi Arabia",
        imageUrl: user,
      },
    ];
  }
};
