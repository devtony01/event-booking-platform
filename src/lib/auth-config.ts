// Check if social auth providers are configured
export const isGoogleConfigured = () => {
  return typeof window === 'undefined' && 
    process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET && 
    !process.env.GOOGLE_CLIENT_ID.includes('demo') &&
    !process.env.GOOGLE_CLIENT_SECRET.includes('demo');
};

export const isGitHubConfigured = () => {
  return typeof window === 'undefined' && 
    process.env.GITHUB_ID && 
    process.env.GITHUB_SECRET && 
    !process.env.GITHUB_ID.includes('demo') &&
    !process.env.GITHUB_SECRET.includes('demo');
};

export const getSocialProviders = () => {
  const providers = [];
  
  if (isGoogleConfigured()) {
    providers.push({
      id: 'google',
      name: 'Google',
      icon: 'google'
    });
  }
  
  if (isGitHubConfigured()) {
    providers.push({
      id: 'github',
      name: 'GitHub',
      icon: 'github'
    });
  }
  
  return providers;
};