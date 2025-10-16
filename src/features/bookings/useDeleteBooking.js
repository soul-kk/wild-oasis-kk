import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBook } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: deleteBook,

    onSuccess: () => {
      queryClient.invalidateQueries({ active: true });
      toast.success('booking is successfully deleted!');
    },
    onError: () => {
      toast.error('there is an error while deleting a booking');
    },
  });

  return { deleteBooking, isDeleting };
}
