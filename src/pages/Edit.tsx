import React, { useEffect, useState } from "react";

import { Button, TextField, Grid, Typography, Skeleton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useParams } from "react-router-dom";
import useCharacters from "../hooks/useCharacters";
import MultiInput from "../components/MultiInput";
import { Person } from "../types";

type RouteParams = {
  id?: string;
};

const Edit: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getPerson, isLoading, updatePerson } = useCharacters();
  const { id } = useParams<RouteParams>();

  const [data, setData] = useState<Partial<Person>>({
    created: "",
    edited: "",
    eye_color: "",
    films: [],
    gender: "",
    hair_color: "",
    height: "",
    homeworld: "",
    mass: "",
    name: "",
    skin_color: "",
    species: [],
    starships: [],
    url: "",
    vehicles: [],
  });

  useEffect(() => {
    if (id) setPerson(id);
  }, [id]);

  async function setPerson(id: string) {
    const data: Person | null = await getPerson(id);
    if (data) setData(data);
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    if ("value" in event.target) {
      const { name, value } = event.target;
      setData((prev: Partial<Person>) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  function handleBack() {
    navigate(-1);
  }

  const handleSubmit = () => {
    if (id) updatePerson(id, data);
  };

  return (
    <Grid maxWidth={"600px"} container gap={3} paddingBottom={2}>
      <Typography variant="h4" component="h1">
        Edit Person
      </Typography>
      {isLoading ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={isMobile ? 300 : 600}
              height={60}
            />
          ))}
        </>
      ) : (
        <>
          <TextField
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Birth Year"
            name="birth_year"
            value={data.birth_year}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Eye Color"
            name="eye_color"
            value={data.eye_color}
            onChange={handleChange}
            fullWidth
          />

          <MultiInput
            label="Films"
            values={data.films || []}
            onChange={(films: string[]) => {
              setData((prev: Partial<Person>) => ({
                ...prev,
                films,
              }));
            }}
          />

          <TextField
            label="Gender"
            name="gender"
            value={data.gender}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Hair Color"
            name="hair_color"
            value={data.hair_color}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Height"
            name="height"
            value={data.height}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Homeworld"
            name="homeworld"
            value={data.homeworld}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Mass"
            name="mass"
            value={data.mass}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Skin Color"
            name="skin_color"
            value={data.skin_color}
            onChange={handleChange}
            fullWidth
          />

          <MultiInput
            label="Species"
            values={data.species || []}
            onChange={(species: string[]) => {
              setData((prev: Partial<Person>) => ({
                ...prev,
                species,
              }));
            }}
          />

          <MultiInput
            label="Starships"
            values={data.starships || []}
            onChange={(starships: string[]) => {
              setData((prev: Partial<Person>) => ({
                ...prev,
                starships,
              }));
            }}
          />

          <TextField
            label="URL"
            name="url"
            value={data.url}
            onChange={handleChange}
            fullWidth
          />

          <MultiInput
            label="Vehicles"
            values={data.vehicles || []}
            onChange={(vehicles: string[]) => {
              setData((prev: Partial<Person>) => ({
                ...prev,
                vehicles,
              }));
            }}
          />

          <Grid container gap={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleBack()}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Update
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Edit;
