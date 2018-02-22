function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function authentication(credentials) {
  if (!credentials.username || !credentials.password) {
    throw Error('credentials missing');
  }
  await sleep(500);
  const token = 'yummy-chocolate';
  return token;
}
