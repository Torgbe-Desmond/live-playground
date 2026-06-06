import { v4 as uuidv4 } from "uuid";

export const generateConversationId = (userA, userB) => {
  const sorted = [userA, userB].sort();
  return `${sorted[0]}_${sorted[1]}`;
};

export const formatTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Today";
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
};

export const isImageFile = (type) =>
  type?.startsWith("image/");

export const isVideoFile = (type) =>
  type?.startsWith("video/");

export const isAudioFile = (type) =>
  type?.startsWith("audio/");

export const newMessageId = () => uuidv4();

export const getFileIcon = (type) => {
  if (isImageFile(type)) return "image";
  if (isVideoFile(type)) return "video";
  if (isAudioFile(type)) return "audio";
  return "file";
};
