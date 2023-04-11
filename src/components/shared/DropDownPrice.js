
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, Button, Divider, OutlinedInput, InputAdornment, Typography } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Image } from "../../components/index";
import { useAppContext } from "../../context-api/appContext";
import { toast } from "react-toastify";



function DropDownPrice({ text, alt, src, isIcon, data }) {
  

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [range, setRange] = React.useState({
    min:0,
    max:0
  });
  const { dispatch , state} = useAppContext();

  React.useEffect(() => {
    state?.clearAll &&  setRange({min:0,max:0}) // true if clear all filter 
    dispatch({ type: "PRICE_FILTER", value: {min:0,max:0}});
    dispatch({ type: "SKIP_FILTER", value: 0})
    dispatch({ type: "CLEAR_ALL", value: false});


  },[state?.clearAll])


  const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
  return (
    <>
      <Box>
        <Button
          variant=""
          className="gradient-button"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {isIcon && (
            <Box className="blue-icon" mr={1}>
              <Image
                alt={alt}
                src={src}
                sx={{ width: "15px", height: "15px" }}
              />
            </Box>
          )}

          {text}
        </Button>
      </Box>
      {/* {------------------------------------------} */}
      <Menu
        sx={{display: "flex" ,justifyContent: "center"}}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}

      >
        <List
          sx={{
            display: "flex",
            flexDirection: 'column',
            width: "100%",
            bgcolor: "background.paper",
            paddingLeft: 0, paddingRight: 0,
            justifyContent: "center"
          }}
        >
           <Box display="flex" justifyContent="center" minWidth={340} mb={2}>
           <OutlinedInput
              id="outlined-adornment-weight"
              type="number"
              value={range.min}
             onChange={(e) =>{
               if(e.target.value < 1000){
                setRange((prev)=>{
                  return{ 
                    ...prev,
                    min:parseFloat(e.target.value)
                  }
                })
               }
             }}
              placeholder="Min"
              // endAdornment={<InputAdornment position="end">Min</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              sx={{ width: "100px", marginRight: 4 }}
            />

              <Typography sx={{display: "flex", justifyContent: "center", alignItems: "center",  marginRight: 4}}>
                to
              </Typography>
           

            <OutlinedInput
              type="number"
              value={range.max}
              onChange={(e) => {
                if(e.target.value <1000){
                  setRange((prev)=>{
                    return{ 
                      ...prev,
                      max:parseFloat(e.target.value)
                    }
                  })
                }
              }}
              placeholder="Max"
              // endAdornment={<InputAdornment position="end">Min</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "weight",
              }}
              sx={{ width: "100px" }}
            />
            

          </Box>


        
          <Box display="inline-flex" justifyContent="center">
            {/* <Button onClick={()=>console.log(checked,"checked")}>Apply</Button> */}
            <Button
              onClick={() => {
                if(range.min > range.max){
toast.error("Invalid range", { autoClose: 1200 });
return;
                }
                // if(range.min === 0){toast.error("Minimum value should be greater than zero.", { autoClose: 1000 });
                // return;}
                dispatch({ type: "PRICE_FILTER", value: range });
                dispatch({ type: "SKIP_FILTER", value: 0})
                setAnchorEl(null);
                
              }}
              variant="containedInherit"
              target="_blank"
              sx={{
                borderRadius: "4px",
                minWidth: "124px",
                marginBlock: 2,
                marginRight: 4,
                height: "40px"
              }}
            >
              Apply
            </Button>

            <Button
              onClick={() => {
                setAnchorEl(null);
                setRange({min:0,max:0})
                dispatch({ type: "PRICE_FILTER", value: {min:0,max:0}});
                dispatch({ type: "SKIP_FILTER", value: 0})
                
                
                
              }}
              variant="outlined"
              target="_blank"
              sx={{
                minWidth: "124px",
                borderColor: "black",
                color: "black",
                borderRadius: "4px",
                marginBlock: 2,
                height: "40px"
              }}
            >
              Clear
            </Button>
          </Box>
        </List>
      </Menu>
    </>
  );
}

export default DropDownPrice;
