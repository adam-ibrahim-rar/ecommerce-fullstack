export type BannerType = "hero" | "promo";

export interface Banner {
  id: string;
  type: BannerType;
  title: string;
  heading?: string;
  description?: string;
  image: string;
  buttonText?: string;
  link: string;
  endsAt?: string;
  order: number;
  isActive: boolean;
}

export interface CreateBannerInput {
  type: BannerType;
  title: string;
  heading?: string;
  description?: string;
  image: string;
  buttonText?: string;
  link: string;
  endsAt?: string;
  order?: number;
  isActive?: boolean;
}

export interface UpdateBannerInput {
  type?: BannerType;
  title?: string;
  heading?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  link?: string;
  endsAt?: string;
  order?: number;
  isActive?: boolean;
}

export interface BannerQuery {
  type?: BannerType;
}