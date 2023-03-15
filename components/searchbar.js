import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Searchbar = () => {

  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      router.push({
        pathname : '/searchproduct',
        query : {value : searchValue}
      })
    }
  }

  return (
    <div className="searchdiv ">
      <div className="searchbox">
        <SearchIcon />
        <input
          value={searchValue}
          placeholder={"Try Apple here..."}
          onKeyDown={handleKeyDown}
          onChange = {(e)=>{setSearchValue(e.target.value)}}
        />
      </div>
    </div>
  );
}

export default Searchbar