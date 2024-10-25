/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";


 const error = css`
  padding-top: 64px;
  padding-bottom: 64px;
  text-align: center;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

export const ErrorState = ({ errorClassName, errorStyle }) => {
  return (
    <div css={error} className={errorClassName} style={errorStyle}>
      Failed to load Google reviews. Please try again later.
    </div>
  );
};


