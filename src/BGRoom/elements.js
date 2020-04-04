import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Container, Item } from "../Grid";

export const DetachedButton = styled(Button)`
  && {
    margin-left: 4px;
  }
`;

export const DetachedContainer = styled(Container)`
  margin-top: 4px;
`;

export const AlignCenterItem = styled(Item)`
  text-align: center;
`;

export const AlignLeftItem = styled(Item)`
  text-align: left;
`;

export const AlignRightItem = styled(Item)`
  text-align: right;
`;