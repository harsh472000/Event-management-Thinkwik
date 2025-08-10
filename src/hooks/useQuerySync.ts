import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterState, SortKey } from '@/types/event';

const parse = (sp: URLSearchParams): FilterState => ({
  q: sp.get('q') ?? '',
  eventType: (sp.get('type') as any) ?? 'All',
  category: (sp.get('cat') as any) ?? 'All',
  from: sp.get('from') ?? undefined,
  to: sp.get('to') ?? undefined,
  sortBy: ((sp.get('sort') as SortKey) ?? 'start'),
});

const toParams = (f: FilterState): Record<string,string> => {
  const out: Record<string,string> = {};
  if (f.q) out.q = f.q;
  if (f.eventType !== 'All') out.type = f.eventType;
  if (f.category !== 'All') out.cat = f.category;
  if (f.from) out.from = f.from;
  if (f.to) out.to = f.to;
  if (f.sortBy !== 'start') out.sort = f.sortBy;
  return out;
};

export function useQuerySync(filters: FilterState, setFilters: (u: (c: FilterState)=>FilterState)=>void) {
  const [sp, setSp] = useSearchParams();

  // On mount, hydrate from URL
  useEffect(() => {
    setFilters(() => parse(sp));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When filters change, reflect in URL (replace to avoid history spam)
  useEffect(() => {
    const params = toParams(filters);
    setSp(params, { replace: true });
  }, [filters, setSp]);
}