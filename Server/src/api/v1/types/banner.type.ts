export interface CreateBannerInput {
  type: "hero" | "promo";
  title: string;
  heading?: string;
  description?: string;
  image: string;
  buttonText?: string;
  link: string;
  endsAt?: Date;
  order?: number;
  isActive?: boolean;
}

export interface UpdateBannerInput {
  type?: "hero" | "promo";
  title?: string;
  heading?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  link?: string;
  endsAt?: Date;
  order?: number;
  isActive?: boolean;
}

export interface BannerQuery {
  type?: "hero" | "promo";
}

export interface BannerParams {
  id: string;
}

export interface BannerResponse {
  id: string;
  type: "hero" | "promo";
  title: string;
  heading?: string;
  description?: string;
  image: string;
  buttonText?: string;
  link: string;
  endsAt?: string;
  order: number;
}