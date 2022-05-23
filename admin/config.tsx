import { AdminConfig } from '@keystone-6/core/types';
import { Logo } from './components/Logo';
import { Navigation as CustomNavigation } from './components/Navigation'

export const components: AdminConfig['components'] = {
  Logo: Logo,
  Navigation: CustomNavigation
};