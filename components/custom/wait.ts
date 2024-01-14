const wait = (duration: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

export default wait;
