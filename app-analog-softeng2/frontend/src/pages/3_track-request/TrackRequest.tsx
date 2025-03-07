import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Divider,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  Select,
} from "@mui/material";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CircleIcon from "@mui/icons-material/Circle";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../components/Header";
import "./TrackRequest.css";

const TrackRequest = () => {
  const [status, setStatus] = useState("Pending");
  const [selectedFactory, setSelectedFactory] = useState("");

  // Hardcoded shipment data
  const shipments = [
    {
      id: "REQ123",
      moduleOrigin: "Rd. Santa Ana, Illinois 85486",
      recipient: "Rd. Inglewood, Maine 98380",
      client: "Requester",
      factory: "Factory A",
      status: "Pending",
    },
    {
      id: "REQ124",
      moduleOrigin: "Rd. Brooklyn, New York 11201",
      recipient: "Rd. Austin, Texas 73301",
      client: "Requester",
      factory: "Factory B",
      status: "In-Transit",
    },
    {
      id: "REQ125",
      moduleOrigin: "Rd. San Diego, California 92101",
      recipient: "Rd. Miami, Florida 33101",
      client: "Requester",
      factory: "Factory C",
      status: "Out-for-Delivery",
    },
    {
      id: "REQ126",
      moduleOrigin: "Rd. Seattle, Washington 98101",
      recipient: "Rd. Denver, Colorado 80201",
      client: "Requester",
      factory: "Factory D",
      status: "Delivered",
    },
    {
      id: "REQ127",
      moduleOrigin: "Rd. Dallas, Texas 75201",
      recipient: "Rd. Atlanta, Georgia 30301",
      client: "Requester",
      factory: "Factory E",
      status: "Pending",
    },
    {
      id: "REQ128",
      moduleOrigin: "Rd. San Francisco, California 94101",
      recipient: "Rd. Boston, Massachusetts 02101",
      client: "Requester",
      factory: "Factory F",
      status: "In-Transit",
    },
    {
      id: "REQ129",
      moduleOrigin: "Rd. Houston, Texas 77001",
      recipient: "Rd. Philadelphia, Pennsylvania 19101",
      client: "Requester",
      factory: "Factory G",
      status: "Out-for-Delivery",
    },
    {
      id: "REQ130",
      moduleOrigin: "Rd. Phoenix, Arizona 85001",
      recipient: "Rd. Charlotte, North Carolina 28201",
      client: "Requester",
      factory: "Factory H",
      status: "Delivered",
    },
    {
      id: "REQ131",
      moduleOrigin: "Rd. Las Vegas, Nevada 89101",
      recipient: "Rd. Chicago, Illinois 60601",
      client: "Requester",
      factory: "Factory I",
      status: "Pending",
    },
    {
      id: "REQ132",
      moduleOrigin: "Rd. Orlando, Florida 32801",
      recipient: "Rd. Detroit, Michigan 48201",
      client: "Requester",
      factory: "Factory J",
      status: "In-Transit",
    },
  ];

  // Handle status change
  const handleStatusChange = (event, newStatus) => {
    if (newStatus !== null) setStatus(newStatus);
  };

  // Handle moving shipment to the next status
  const updateShipmentStatus = (shipment) => {
    if (shipment.status === "Pending") {
      shipment.status = "In-Transit";
    } else if (shipment.status === "In Transit") {
      shipment.status = "Out-for-Delivery";
    } else if (shipment.status === "Out for Delivery") {
      shipment.status = "Delivered";
    }
    setStatus(status); // Trigger re-render
  };

  return (
    <div className="main-div">
      <Header />

      <div className="map-and-card">
        {/* Left Panel - Shipment List */}
        <div className="shipment-side">
          <h2>Tracking</h2>
          {/* Status Toggle */}
          <ToggleButtonGroup
            value={status}
            exclusive
            onChange={handleStatusChange}
            sx={{
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
              borderRadius: "17px!important",
              fontSize: "0.8rem",
              transition: "all 0.2s ease-in-out",
              display: "flex", // Ensure flexbox is applied
              width: "100%",
              gap: "1rem", // Adjust gap between buttons
              "&.Mui-selected, &.Mui-focusVisible": {
                backgroundColor: "#261cc9",
                color: "white",
              },
            }}
          >
            <ToggleButton
              value="Pending"
              sx={{
                color: "#444",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                borderRadius: "17px!important",
                backgroundColor: "#f8f9fa",
                fontSize: "0.7rem",
                padding: "1rem",
                height: "2rem",
                overflow: "hidden",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#e2e6ea",
                },
                "&.Mui-selected, &.Mui-focusVisible": {
                  backgroundColor: "#261cc9",
                  color: "white",
                },
              }}
            >
              Pending
            </ToggleButton>
            <ToggleButton
              value="In-Transit"
              sx={{
                color: "#444",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                borderRadius: "17px!important",
                backgroundColor: "#f8f9fa",
                fontSize: "0.7rem",
                padding: "1rem",
                height: "2rem",
                overflow: "hidden",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#e2e6ea",
                },
                "&.Mui-selected, &.Mui-focusVisible": {
                  backgroundColor: "#261cc9",
                  color: "white",
                },
              }}
            >
              In-Transit
            </ToggleButton>
            <ToggleButton
              value="Out-for-Delivery"
              sx={{
                color: "#444",
                fontWeight: 600,
                fontFamily: "'Poppins', sans-serif",
                borderRadius: "17px!important",
                backgroundColor: "#f8f9fa",
                fontSize: "0.7rem",
                padding: "1rem",
                height: "2rem",
                overflow: "hidden",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "#e2e6ea",
                },
                "&.Mui-selected, &.Mui-focusVisible": {
                  backgroundColor: "#261cc9",
                  color: "white",
                },
              }}
            >
              Out-For-Delivery
            </ToggleButton>
          </ToggleButtonGroup>

          {/* Factory Filter */}
          <Select
            value={selectedFactory}
            onChange={(e) => setSelectedFactory(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Select Factory</MenuItem>
            <MenuItem value="Factory A">Factory A</MenuItem>
            <MenuItem value="Factory B">Factory B</MenuItem>
            <MenuItem value="Factory C">Factory C</MenuItem>
          </Select>

          <div
            style={{
              height: "500px", // Set a fixed height for the container
              overflowY: "auto", // Enables vertical scrolling
              paddingRight: "5px",
            }}
          >
            {shipments
              .filter(
                (shipment) =>
                  shipment.status === status &&
                  (selectedFactory === "" ||
                    shipment.factory === selectedFactory)
              )
              .map((shipment) => (
                <Card
                  key={shipment.id}
                  sx={{
                    height: "fit-content", // Card adjusts to content height
                    borderRadius: 3,
                    width: "100%",
                    paddingLeft: 1,
                    paddingRight: 1, // Fixed typo "paddingRi"
                    mb: 2,
                    backgroundColor: "#f2f6fd",
                  }}
                >
                  <CardContent>
                    {/* Shipment Header */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="subtitle2" color="textSecondary">
                          Shipment number
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                          {shipment.id}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Camera Modules
                        </Typography>
                      </Box>

                      <LocalShippingOutlined
                        sx={{ fontSize: 90, color: "#424242" }}
                      />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Module Origin */}
                    <Box display="flex" alignItems="center" gap={1}>
                      <CircleIcon sx={{ color: "#2ECC71", fontSize: 14 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Module Origin
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {shipment.moduleOrigin}
                        </Typography>
                      </Box>
                    </Box>

                    {/* Recipient */}
                    <Box display="flex" alignItems="center" gap={1} mt={1}>
                      <LocationOnIcon sx={{ color: "#5B47D2", fontSize: 18 }} />
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          Recipient
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {shipment.recipient}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Requester */}
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar
                          sx={{ bgcolor: "#5B47D2", width: 32, height: 32 }}
                        >
                          {shipment.client.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" color="textSecondary">
                            Client
                          </Typography>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {shipment.client}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {shipment.factory}
                          </Typography>
                        </Box>
                      </Box>
                      {shipment.status !== "Delivered" && (
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: "#4F46E5",
                            color: "white",
                            borderRadius: 2,
                          }}
                          onClick={() => updateShipmentStatus(shipment)}
                        >
                          {shipment.status === "Pending"
                            ? "Transit"
                            : shipment.status === "In-Transit"
                            ? "Deliver"
                            : "Complete"}
                        </Button>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* Right Panel - Map */}
        <div className="map-side">
          <MapContainer
            center={[14.6091, 120.9892]} // Sampaloc, Manila
            zoom={13}
            style={{
              height: "100%",
              width: "100%",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default TrackRequest;
