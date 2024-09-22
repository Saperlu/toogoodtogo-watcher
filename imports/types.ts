import { Meteor } from "meteor/meteor";

export interface Item {
  pickup_interval?: {
    start: string;
    end: string;
  };
  item: {
    item_id: string;
    sales_taxes?: {
      tax_description?: string;
      tax_percentage?: number;
    }[];
    tax_amount?: {
      code?: string;
      minor_units?: number;
      decimals?: number;
    };
    price_excluding_taxes?: {
      code?: string;
      minor_units?: number;
      decimals?: number;
    };
    price_including_taxes?: {
      code?: string;
      minor_units?: number;
      decimals?: number;
    };
    value_excluding_taxes?: {
      code?: string;
      minor_units?: number;
      decimals?: number;
    };
    value_including_taxes?: {
      code?: string;
      minor_units?: number;
      decimals?: number;
    };
    taxation_policy?: string;
    show_sales_taxes?: boolean;
    item_price?: {
      code?: string;
      minor_units?: number;
      decimals?: number;
    };
    item_value?: {
      code?: string;
      minor_units?: number;
      decimals?: number;
    };
    cover_picture: {
      picture_id?: string;
      current_url: string;
      is_automatically_created?: boolean;
    };
    logo_picture: {
      picture_id?: string;
      current_url: string;
      is_automatically_created?: boolean;
    };
    name: string;
    description: string;
    food_handling_instructions?: string | undefined;
    can_user_supply_packaging?: boolean;
    packaging_option?: string;
    collection_info?: string;
    diet_categories?: unknown[];
    item_category?: string;
    buffet?: boolean;
    badges?: {
      badge_type?: string;
      rating_group?: string;
      percentage?: number;
      user_count?: number;
      month_count?: number;
    }[];
    positive_rating_reasons?: string[];
    average_overall_rating?: {
      average_overall_rating?: number;
      rating_count?: number;
      month_count?: number;
    };
    favorite_count?: number;
  };
  store: {
    store_id?: string;
    store_name: string;
    branch?: string;
    description?: string;
    tax_identifier?: string;
    website?: string;
    store_location: {
      address?: {
        country?: {
          iso_code?: string;
          name?: string;
        };
        address_line?: string;
        city?: string;
        postal_code?: string;
      };
      location: {
        longitude: number;
        latitude: number;
      };
    };
    logo_picture?: {
      picture_id?: string;
      current_url?: string;
      is_automatically_created?: boolean;
    };
    store_time_zone?: string;
    hidden?: boolean;
    favorite_count?: number;
    we_care?: boolean;
    distance?: number;
    cover_picture?: {
      picture_id?: string;
      current_url?: string;
      is_automatically_created?: boolean;
    };
    is_manufacturer?: boolean;
  };
  display_name?: string;
  pickup_location?: {
    address?: {
      country?: {
        iso_code?: string;
        name?: string;
      };
      address_line?: string;
      city?: string;
      postal_code?: string;
    };
    location?: {
      longitude?: number;
      latitude?: number;
    };
  };
  items_available: number;
  distance?: number;
  favorite?: boolean;
  in_sales_window?: boolean;
  new_item?: boolean;
  item_type?: string;
  matches_filters?: boolean;
  item_tags?: {
    id?: string;
    short_text?: string;
    long_text?: string;
  }[];
}

export type ItemsContextType = {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
};
export type SelectedItemContextType = {
  selectedItem: Item | undefined;
  setSelectedItem: React.Dispatch<React.SetStateAction<Item | undefined>>;
};

export interface UnsyncedUser extends Meteor.User {
  profile: {
    email: string;
    tgtg: {
      waitingAuths: Array<string>;
    };
  };
}
export interface SyncedUser extends Meteor.User {
  profile: {
    email: string;
    tgtg: {
      userId: string;
      accessToken: string;
      refreshToken: string;
      validUntil: Date;
      cookie: string[];
    };
  };
}

export type MeteorUser = UnsyncedUser | SyncedUser | null;

export type TgtgApiResponseAuthPoll = {
  access_token: string;
  access_token_ttl_seconds: number;
  refresh_token: string;
  startup_data: {
    user: {
      user_id: string;
    };
    user_settings: {
      bound_sw: {
        longitude: number;
        latitude: number;
      };
      bound_ne: {
        longitude: number;
        latitude: number;
      };
    };
  };
};
