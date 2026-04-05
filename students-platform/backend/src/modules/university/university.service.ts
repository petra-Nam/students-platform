import { validateSearchParams, parsePage } from './university.validation';

interface HipolabsUniversity {
  name: string;
  country: string;
  alpha_two_code: string;
  web_pages: string[];
  domains: string[];
  ['state-province']: string | null;
}

interface UniversityDTO {
  name: string;
  country: string;
  countryCode: string;
  stateProvince: string | null;
  website: string | null;
  domain: string | null;
}

interface SearchParams {
  name?: string;
  country?: string;
  page?: string | number;
}

interface SearchResult {
  universities: UniversityDTO[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

class UniversityService {
  private readonly API_BASE_URL = process.env.UNIVERSITY_API_URL;
  private readonly PER_PAGE = 10;

  async searchUniversities(params: SearchParams): Promise<SearchResult> {
    const { name, country, page: pageParam } = params;

    if (!validateSearchParams(name, country)) {
      throw new Error('At least one search parameter (name or country) is required');
    }

    const page =
      typeof pageParam === 'number' ? pageParam : parsePage(pageParam as string | undefined);

    const queryParams = new URLSearchParams();
    if (name) queryParams.set('name', name);
    if (country) queryParams.set('country', country);

    const url = `${this.API_BASE_URL}?${queryParams.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch universities from external API');
    }

    const data = (await response.json()) as HipolabsUniversity[];

    const allUniversities: UniversityDTO[] = data.map((u) => ({
      name: u.name,
      country: u.country,
      countryCode: u.alpha_two_code,
      stateProvince: u['state-province'],
      website: u.web_pages[0] ?? null,
      domain: u.domains[0] ?? null,
    }));

    const total = allUniversities.length;
    const totalPages = Math.max(1, Math.ceil(total / this.PER_PAGE));

    const startIndex = (page - 1) * this.PER_PAGE;
    const universities = allUniversities.slice(
      startIndex,
      startIndex + this.PER_PAGE
    );

    return {
      universities,
      page,
      perPage: this.PER_PAGE,
      total,
      totalPages,
    };
  }
}

export const universityService = new UniversityService();
