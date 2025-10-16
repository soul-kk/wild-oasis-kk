import { useQuery } from '@tanstack/react-query';
import { getSetting } from '../../services/apiSetting';

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings,
  } = useQuery({
    queryKey: ['setting'],
    queryFn: getSetting,
  });

  return { isLoading, error, settings };
}
