export const isMobile =
/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

console.log("Is Mobile ==>",isMobile)