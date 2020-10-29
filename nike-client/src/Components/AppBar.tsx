import React, { useState } from "react";
import {
  AppBar as MuiAppBar,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  useScrollTrigger,
} from "@material-ui/core";
import { Typography } from "@equinor/eds-core-react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "Components/Auth";
import { tokens } from "@equinor/eds-tokens";
import IconButton from "@material-ui/core/IconButton";
import { Icon } from "Components/EDS";
import equinorLogo from "Images/equinor.svg";

const useStyles = makeStyles(({ spacing, breakpoints }: Theme) => ({
  title: {
    flexGrow: 1,
    marginLeft: spacing(6),
    marginRight: spacing(6),
    [breakpoints.down("xs")]: {
      marginLeft: spacing(2),
      marginRight: spacing(2),
    },
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  avatarButton: {
    marginRight: -12,
  },
  avatar: {
    margin: spacing(1),
    width: spacing(3),
    height: spacing(3),
    backgroundColor: tokens.colors.text.static_icons__tertiary.hex,
    fontSize: 10,
  },
  actionIcon: {
    marginRight: spacing(2),
  },
  equinorLogo: {
    height: 45,
  },
}));

export const AppBar = () => {
  const classes = useStyles();
  const { account, photo, authState, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  const userName = account?.idTokenClaims?.given_name ?? account?.name;

  return (
    <MuiAppBar elevation={trigger ? 4 : 0}>
      <Toolbar>
        <img
          className={classes.equinorLogo}
          src={equinorLogo}
          alt="Equinor Logo"
        />

        <Typography variant="h6" className={classes.title}>
          Team Nike
        </Typography>

        {authState === "authorized" && (
          <>
            <Typography variant="h6">{userName ?? ""}</Typography>
            <IconButton
              className={classes.avatarButton}
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <Avatar
                className={classes.avatar}
                src={photo ?? "missing image"}
                alt={userName}
              />
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Icon name="exit_to_app" />
                </ListItemIcon>
                <ListItemText>Log out</ListItemText>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
      {!trigger && <Divider />}
    </MuiAppBar>
  );
};
