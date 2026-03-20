export interface SavedPass {
  savedId: string;
  createdAt: string;
  label: string;
  name: string;
  color: string;
  textColor: string;
  secondaryColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  id: string;
  type: string;
  payload?: string;
  finish: string;
  icon: string;
  techType: 'nfc' | 'qr';
  qrContent: string;
  layout: 'standard' | 'compact' | 'minimal';
  customFields: Array<{ label: string; value: string }>;
}

const STORAGE_KEY = 'passly-saved-passes';

export const getSavedPasses = (): SavedPass[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as SavedPass[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const savePass = (pass: Omit<SavedPass, 'savedId' | 'createdAt'>) => {
  if (typeof window === 'undefined') {
    return;
  }

  const nextPass: SavedPass = {
    ...pass,
    savedId: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const passes = getSavedPasses();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([nextPass, ...passes]));
};

export const deletePass = (savedId: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  const passes = getSavedPasses().filter((pass) => pass.savedId !== savedId);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(passes));
};
