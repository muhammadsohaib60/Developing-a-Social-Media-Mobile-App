import {
  community,
  ethnic,
  neighborhood,
  occ,
  pol,
  post,
  religion,
  school,
  sports,
  uni,
  user,
} from "./images";

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

export const setUser = () => {
  return {
    username: "MaaniObrick_121",
    name: "Maani G63",
    jobTitle: "Senior Software Developer",
    tags: ["Reactjs", "Java", "Football"],
    phone: "+2523 12321 1231",
    email: "test@gmail.com",
    profileImage: user, // Replace with actual image URL
  };
};

export const setTribes = () => {
  return [
    {
      id: "1",
      title: "React Developers",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTO8H6mRVR83mbxemvDIPW8rbiLZ1b8XVl6Q&s",
      details: "Community of React Developers",
    },
    {
      id: "2",
      title: "Java Developers",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzKVrVcrrTL7A8B75qwwrpkAx3uOewEt9RbA&s",
      details: "Community of Java Developers",
    },
    {
      id: "3",
      title: "Football Lovers",
      img: "https://thumbs.dreamstime.com/b/football-soccer-ball-kickoff-game-sunset-38302251.jpg",
      details: "We love Football",
    },
    {
      id: "4",
      title: "Software Engineers",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoHsr-I3fcosAKgDVPSgLFiMR-1p_T12P5CA&s",
      details: "We are Software Developers",
    },
  ];
};

export const setCommunities = () => {
  return [
    {
      id: "1",
      name: "Gulsher",
      imageUrl: community,
      posts: 123,
      members: 123,
    },
    {
      id: "2",
      name: "Secondary School",
      imageUrl: school,
      posts: 123,
      members: 123,
    },
    {
      id: "3",
      name: "University",
      imageUrl: uni,
      posts: 123,
      members: 123,
    },
    {
      id: "4",
      name: "Occupation",
      imageUrl: occ,
      posts: 123,
      members: 123,
    },
    {
      id: "5",
      name: "Religion",
      imageUrl: religion,
      posts: 123,
      members: 123,
    },
    {
      id: "6",
      name: "Political Party",
      imageUrl: pol,
      posts: 123,
      members: 123,
    },
    {
      id: "7",
      name: "Sports Club",
      imageUrl: sports,
      posts: 123,
      members: 123,
    },
    {
      id: "8",
      name: "Ethnic Tribe",
      imageUrl: ethnic,
      posts: 123,
      members: 123,
    },
    {
      id: "9",
      name: "Neighborhood",
      imageUrl: neighborhood,
      posts: 123,
      members: 123,
    },
  ];
};

export const setFlags = () => {
  return [
    {
      img: community,
      msg: "You liked Ocama's post",
      caption: "Party All night, it was crazy!!!!",
      id: "1",
    },
    {
      img: community,
      msg: "You liked Ocama's post",
      caption: "Party All night, it was crazy!!!!",
      id: "2",
    },
    {
      img: community,
      msg: "You liked Ocama's post",
      caption: "Party All night, it was crazy!!!!",
      id: "3",
    },
    {
      img: community,
      msg: "You liked Ocama's post",
      caption: "Party All night, it was crazy!!!!",
      id: "4",
    },
    {
      img: community,
      msg: "You liked Ocama's post",
      caption: "Party All night, it was crazy!!!!",
      id: "5",
    },
    {
      img: community,
      msg: "You liked Ocama's post",
      caption: "Party All night, it was crazy!!!!",
      id: "6",
    },
    {
      img: community,
      msg: "You liked Ocama's post",
      caption: "Party All night, it was crazy!!!!",
      id: "7",
    },
  ];
};

export const setChats = () => {
  return [
    {
      id: "1",
      name: "Maani",
      lastMessage: "Hello, how are you?",
      imageUrl: user,
    },
    {
      id: "2",
      name: "Aimon",
      lastMessage: "Hello, how are you?",
      imageUrl: user,
    },
    {
      id: "3",
      name: "Alisa",
      lastMessage: "Hello, how are you?",
      imageUrl: user,
    },
    {
      id: "4",
      name: "Monte",
      lastMessage: "Hello, how are you?",
      imageUrl: user,
    },
  ];
};

export const setChatUser = () => {
  return {
    name: "Maani",
    username: "MaaniObrick_121",
    profileImage: user,
    id: "1",
  };
};

export const setMessages = () => {
  return [
    {
      id: "1",
      message: "Hello, how are you?",
      senderId: "1",
    },
    {
      id: "2",
      message: "I am fine, how about you?",
      senderId: "2",
    },
    {
      id: "3",
      message: "I am also good",

      senderId: "1",
    },
    {
      id: "4",
      message: "What are you doing?",
      senderId: "2",
    },
    {
      id: "5",
      message: "Nothing much, just chilling",
      senderId: "1",
    },
    {
      id: "6",
      message: "That's great",
      senderId: "2",
    },
  ];
};

export const setPost = () => {
  return [
    {
      id: "1",
      user: {
        name: "Maani",
        profileImage: user,
      },
      postMedia: [
        { src: post, type: "image" },
        { src: post, type: "image" },
        { src: community, type: "image" },
      ],
      caption: "Party All night, it was crazy!!!!",
    },
    {
      id: "2",
      user: {
        name: "Maani",
        profileImage: user,
      },
      postMedia: [
        { src: post, type: "image" },
        { src: require("../assets/videos/story1.mp4"), type: "video" },
      ],
      caption: "Awesome vibes!",
    },
    {
      id: "3",
      user: {
        name: "Maani",
        profileImage: user,
      },
      postMedia: [
        { src: post, type: "image" },
        { src: require("../assets/videos/story1.mp4"), type: "video" },
      ],
      caption: "Unforgettable moments!",
    },
    {
      id: "4",
      user: {
        name: "Maani",
        profileImage: user,
      },
      postMedia: [
        { src: post, type: "image" },
        { src: post, type: "image" },
        { src: require("../assets/videos/story1.mp4"), type: "video" },
      ],
      caption: "Just another night out!",
    },
  ];
};

export const setStories2 = () => {
  return [
    {
      type: "image",
      source: require("../assets/images/community.png"),
      user: {
        name: "John Doe",
        profileImage: require("../assets/images/user.png"),
      },
    },
    {
      type: "video",
      source: require("../assets/videos/story1.mp4"),
      user: {
        name: "Jane Smith",
        profileImage: require("../assets/images/user.png"),
      },
    },
    {
      type: "image",
      source: require("../assets/images/community.png"),
      user: {
        name: "Alice Johnson",
        profileImage: require("../assets/images/user.png"),
      },
    },
  ];
};
