export const wait = (timeOut: number): Promise<void> => { 
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, timeOut);
    });
  }