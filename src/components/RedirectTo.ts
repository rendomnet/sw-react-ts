import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface RedirectToProps {
  path: string;
}

const RedirectTo: React.FC<RedirectToProps> = ({ path }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(path);
  }, [navigate, path]);

  return null;
};

export default RedirectTo;
