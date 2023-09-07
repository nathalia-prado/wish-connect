import { ChangeEvent, FormEvent, useState } from 'react';
import { editWishList } from '../apis/edit-wishlist-api';
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { as } from 'vitest/dist/reporters-2ff87305.js';
import { Wishlist } from '../../models/wishlist';

const wishlistFormData = {
  name: '',
  description: '',
  price: 0,
  url: '',
  image: '',
};

export function AddWishlistForm() {
  const [formData, setFormData] = useState(wishlistFormData);
  const queryClient = useQueryClient();

  const wishlistMutation = useMutation(editWishList, {
    onSuccess: async (editWishList) => {
      const previousWishlist: Wishlist[] | undefined = queryClient.getQueryData(['wishlist']);
    }