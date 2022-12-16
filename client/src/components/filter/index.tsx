/* eslint-disable max-len */
import {
  Container, Radio, RadioGroup, FormControlLabel, FormControl, Input,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from 'react-router-dom';
import data from '../../categoris';
import './style.css';
import { FilterProps } from '../../interfaces';

function Filter({
  category, changeCategory, priceChange, price, iconChange,
}: FilterProps) {
  const location = useLocation();
  return (
    <Container className="filterContent">
      <div className="sideBar">
        <FormControl>
          <label htmlFor="price" className="label">Minimum budget</label>
          <Input
            name="price"
            type="number"
            onChange={priceChange}
            value={price}
            id="price"
          />
          <label id="demo-radio-buttons-group-label" htmlFor="category" className="label catelabel">
            Categories
            <CloseIcon onClick={iconChange} className="cancleIcon" />
          </label>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={category}
            defaultValue={location.state?.category}
            name="radio-buttons-group"
            className="categories"
            onChange={changeCategory}
            id="category"
          >
            {data.map((ele) => (
              <FormControlLabel
                key={ele.name}
                label={ele.name}
                value={ele.name}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </Container>
  );
}

export default Filter;
