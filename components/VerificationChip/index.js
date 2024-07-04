import Chip from '@mui/material/Chip';

export const VerificationChip = ({ verificationStatus }) => {
    // Determine the chip properties based on the verificationStatus
    const chipProps = verificationStatus
        ? {
            label: "Verified",
            backgroundColor: "green",
            color: "#fff"
        }
        : {
            label: "Not Verified",
            backgroundColor: "red",
            color: "#fff"
        };

    return (
        <Chip
            sx={{
                px: "4px",
                backgroundColor: chipProps.backgroundColor,
                color: chipProps.color,
            }}
            size="small"
            label={chipProps.label}
        />
    );
};

