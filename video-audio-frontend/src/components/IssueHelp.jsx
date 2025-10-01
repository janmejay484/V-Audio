// src/components/IssueHelp.jsx
import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
  Tooltip,
  Box,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const IssueHelp = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Floating Help Icon with pulse effect */}
      <Tooltip title="Need Help?" arrow>
        <IconButton
          onClick={handleClickOpen}
          sx={{
            position: "fixed",
            bottom: 25,
            right: 25,
            background: "rgba(123,97,255,0.85)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(255,255,255,0.2)",
            color: "#fff",
            boxShadow: "0 8px 25px rgba(123,97,255,0.4)",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { boxShadow: "0 0 0 0 rgba(123,97,255,0.7)" },
              "70%": { boxShadow: "0 0 0 20px rgba(123,97,255,0)" },
              "100%": { boxShadow: "0 0 0 0 rgba(123,97,255,0)" },
            },
            "&:hover": {
              background: "rgba(108,85,240,0.95)",
            },
          }}
        >
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>

      {/* Styled Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "18px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #f5f3ff, #e0e7ff)",
          },
        }}
      >
        {/* Header */}
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#fff",
            fontSize: "1.4rem",
            textAlign: "center",
            background: "linear-gradient(135deg, #7b61ff, #9c8cff)",
            py: 2,
          }}
        >
          Having Trouble?
        </DialogTitle>

        {/* Content with an illustration box */}
        <DialogContent
          dividers
          sx={{
            textAlign: "center",
            background: "#fff",
          }}
        >
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png"
            alt="Help"
            sx={{ width: 100, mb: 2 }}
          />
          <Typography variant="body1" sx={{ color: "#444", lineHeight: 1.6 }}>
            Sometimes YouTube may block requests with <b>HTTP 429</b> due to
            cookie refresh issues. <br />
            <br />
            For smooth access, cookies need to be refreshed periodically. <br />
            <br />
            Want to try this live? <b>DM me</b> for access or demo.
          </Typography>
        </DialogContent>

        {/* Action Button */}
        <DialogActions sx={{ justifyContent: "center", py: 2 }}>
          <Button
            onClick={handleClose}
            sx={{
              background: "linear-gradient(135deg, #7b61ff, #9c8cff)",
              color: "#fff",
              px: 4,
              py: 1,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "30px",
              boxShadow: "0 4px 12px rgba(123,97,255,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #6b50e3, #8a79db)",
              },
            }}
          >
            Got it 👍
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IssueHelp;
