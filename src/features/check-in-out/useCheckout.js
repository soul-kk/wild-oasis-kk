import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: deleteBooking,

    onSuccess: (data) => {
      toast.success(`Booking successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error('There an error while checking out'),
  });

  return { checkout, isCheckingOut };
}
