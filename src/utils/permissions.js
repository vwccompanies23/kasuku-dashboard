export const getUserPlan = (user) => {
  if (!user) return 'free';

  const plan =
    String(user.plan || 'free')
      .toLowerCase();

  if (plan === 'pro') {
    return 'pro';
  }

  if (plan === 'artist') {
    return 'artist';
  }

  if (plan === 'solo') {
    return 'solo';
  }

  return 'free';
};

export const getPlanLabel = (plan) => {

  const normalized =
    String(plan || 'free')
      .toLowerCase();

  if (normalized === 'pro') {
    return 'PRO';
  }

  if (normalized === 'artist') {
    return 'ARTIST';
  }

  if (normalized === 'solo') {
    return 'SOLO';
  }

  return 'FREE';
};

export const canUseLabelName = (user) => {

  const plan =
    getUserPlan(user);

  return (
    plan === 'artist' ||
    plan === 'pro'
  );
};

export const canUploadUnlimited = (user) => {

  const plan =
    getUserPlan(user);

  return (
    plan === 'solo' ||
    plan === 'artist' ||
    plan === 'pro'
  );
};