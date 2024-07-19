import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';

interface CustomLinkProps extends MuiLinkProps {
    to: string;
    children: React.ReactNode;
    underline?: "none" | "hover" | "always";
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, children, underline = "none", ...props }) => {
    return (
        <MuiLink component={RouterLink} to={to} underline={underline} {...props}>
            {children}
        </MuiLink>
    );
};

export default CustomLink;
