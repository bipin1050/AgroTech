import SearchIcon from '@mui/icons-material/Search';

const Searchbar = () => {
  return (
    <div className='searchdiv '>
        <div className='searchbox'>
            <SearchIcon />
            <input placeholder={"Try Apple here..."}/>
        </div>
    </div>
  )
}

export default Searchbar