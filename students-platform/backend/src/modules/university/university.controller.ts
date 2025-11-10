import type { Request, Response, NextFunction } from 'express';

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

class UniversityController {

  search = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const name = (req.query.name as string | undefined)?.trim();
      const country = (req.query.country as string | undefined)?.trim();


      const pageParam = parseInt(req.query.page as string, 10);
      const page = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1;

      const perPage = 10;


      if (!name && !country) {
        return res.status(400).json({
          message: 'Please provide at least a "name" or a "country" parameter.',
        });
      }

      const params = new URLSearchParams();
      if (name) params.set('name', name);
      if (country) params.set('country', country);

      const url = `http://universities.hipolabs.com/search?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) {
        return res
          .status(502)
          .json({ message: 'Failed to fetch universities from external API' });
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
      const totalPages = Math.max(1, Math.ceil(total / perPage));

      const startIndex = (page - 1) * perPage;
      const universities = allUniversities.slice(
        startIndex,
        startIndex + perPage
      );

      return res.status(200).json({
        universities,
        page,
        perPage,
        total,
        totalPages,
      });
    } catch (err) {
      next(err);
    }
  };
}

export const universityController = new UniversityController();
