export interface Portfolio {
  id: number;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  github_url: string;
  tech_stack: string;
  category: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  field_of_study: string;
  start_year: string;
  end_year: string;
  description: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface WorkHistory {
  id: number;
  company: string;
  position: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image_url: string;
  category: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
