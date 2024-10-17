"use client";

import { createTheme, Button } from "@mantine/core";

export const theme = createTheme({
  components: {
	Button: Button.extend({
	  defaultProps: {
		color: '#3a6bff'
	  },
	}),
  },
  colors: {
	  'cherry': ['#3a6bff']
  }
});
