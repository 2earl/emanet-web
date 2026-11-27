/**
 * 2earl's company details, as the legal pages name it: the data controller under KVKK and the
 * company information of TTK 1524. Staff set them in Emanet Merkez → Settings; emanet-core's
 * PublicApi returns them. Until then the pages say plainly that they are missing.
 */

export interface Company {
  name: string;
  address: string;
  taxOffice: string;
  vkn: string;
  mersis: string;
  kep: string;
  email: string;
}

interface PublicApi {
  company(): Promise<{ ok: true; value: Company | null } | { ok: false; error: string }>;
}

export const CONTACT = 'iletisim@emanet.dev';

/** What the pages show while staff haven't entered the details yet. */
export const PENDING: Company = {
  name: '[2earl şirket unvanı]',
  address: '[merkez adresi]',
  taxOffice: '[vergi dairesi]',
  vkn: '[vergi kimlik numarası]',
  mersis: '[MERSİS numarası]',
  kep: '[KEP adresi]',
  email: CONTACT,
};

export async function company(env: Env): Promise<{ company: Company; known: boolean }> {
  try {
    const result = await (env.CORE as unknown as PublicApi).company();
    if (result.ok && result.value) return { company: result.value, known: true };
  } catch (error) {
    console.error('company details unavailable', error instanceof Error ? error.name : 'unknown');
  }
  return { company: PENDING, known: false };
}
