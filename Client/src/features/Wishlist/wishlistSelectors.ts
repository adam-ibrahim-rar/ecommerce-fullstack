import type { RootState } from "../../reduxtoolkit/store";

export const selectWishlist = (state: RootState) => state.wishlist.wishlist;
export const selectWishlistItems = (state: RootState) => state.wishlist.wishlist?.items ?? [];
export const selectWishlistLoading = (state: RootState) => state.wishlist.loading;
export const selectWishlistError = (state: RootState) => state.wishlist.error;
