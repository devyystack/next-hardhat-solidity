import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import { Box, Button, Divider } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Image } from "../../components/index";
import { useAppContext } from "../../context-api/appContext";

//  const CustomCheckBox = withStyles({
//   root: {
//     '&$checked': {
//       color: '#3D70B2',
//     },
//   },
//   checked: {},
// })((props) => (
//   <Checkbox

//     {...props}
//   />
// ));

function DropDownMarks({ text, alt, src, isIcon, data } ) {
  const dataObj = {
    categoryData: data || [],
  };

  const { dispatch , state} = useAppContext();


  React.useEffect(() => {
    state?.clearAll && setChecked([]); // true if clear all filter 
    dispatch({ type: "CLEAR_ALL", value: false});

  },[state?.clearAll])

  const [checked, setChecked] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

    console.log("Checked", newChecked);

    if (currentIndex === -1) {

      newChecked.push(value);
    } else {

      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {dataObj.categoryData.length > 0 &&
            dataObj.categoryData.map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem key={value} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        id="dropdown-checkbox"
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={value} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          <Divider />
          <Box display="inline-flex" justifyContent="center" minWidth={300}>
            {/* <Button onClick={()=>console.log(checked,"checked")}>Apply</Button> */}
            <Button
              onClick={() => {
                setAnchorEl(null);
                dispatch({ type: "APPLY_FILTER", value: checked });
                dispatch({ type: "SKIP_FILTER", value: 0})
              }}
              variant="containedInherit"
              target="_blank"
              sx={{
                borderRadius: "4px",
                marginRight: "12px",
                minWidth: "124px",
                marginBlock: 2,
              }}
            >
              Apply
            </Button>

            <Button
              onClick={() => {
                dispatch({ type: "APPLY_FILTER", value: [] });
                dispatch({ type: "SKIP_FILTER", value: 0})
                setAnchorEl(null);
                setChecked([]);
                
                {state?.trendingFilter===true && (dispatch({ type: "TRENDING_FILTER", value: false}))
                dispatch({ type: "APPLY_FILTER", value: [] });
              }

              }}
              variant="outlined"
              target="_blank"
              sx={{
                minWidth: "124px",
                borderColor: "black",
                color: "black",
                borderRadius: "4px",
                marginBlock: 2,
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

export default DropDownMarks;
