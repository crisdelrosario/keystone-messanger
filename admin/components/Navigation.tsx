import React from "react";

import { NavigationContainer, ListNavItems, NavItem } from "@keystone-6/core/admin-ui/components";
import type { NavigationProps } from "@keystone-6/core/admin-ui/components";

export function Navigation({lists, authenticatedItem}: NavigationProps) {
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists}></ListNavItems>
      <NavItem href="/messenger">Messenger</NavItem>
    </NavigationContainer>
  )
}