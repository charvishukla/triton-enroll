import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = ({ onSearch }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    "AIP ",
    "AAS ",
    "AWP ",
    "ANES",
    "ANBI",
    "ANAR",
    "ANTH",
    "ANSC",
    "AESE",
    "AUD ",
    "BENG",
    "BNFO",
    "BIEB",
    "BICD",
    "BIPN",
    "BIBC",
    "BGGN",
    "BGJC",
    "BGRD",
    "BGSE",
    "BILD",
    "BIMM",
    "BISP",
    "BIOM",
    "CMM ",
    "CENG",
    "CHEM",
    "CLX ",
    "CHIN",
    "CLAS",
    "CLIN",
    "CLRE",
    "COGS",
    "COMM",
    "COGR",
    "CSS ",
    "CSE ",
    "CGS ",
    "CAT ",
    "TDDM",
    "TDHD",
    "TDMV",
    "TDPF",
    "TDTR",
    "DSC ",
    "DSE ",
    "DERM",
    "DSGN",
    "DOC ",
    "DDPM",
    "ECON",
    "EDS ",
    "ERC ",
    "ECE ",
    "EMED",
    "ENG ",
    "ENVR",
    "ESYS",
    "ETIM",
    "ETHN",
    "EXPR",
    "FMPH",
    "FPM ",
    "FILM",
    "GPCO",
    "GPEC",
    "GPGN",
    "GPIM",
    "GPLA",
    "GPPA",
    "GPPS",
    "GLBH",
    "GSS ",
    "HITO",
    "HIEA",
    "HIEU",
    "HILA",
    "HISC",
    "HINE",
    "HIUS",
    "HIGR",
    "HILD",
    "HDS ",
    "HUM ",
    "INTL",
    "JAPN",
    "JWSP",
    "LATI",
    "LISL",
    "LIAB",
    "LIFR",
    "LIGN",
    "LIGM",
    "LIHL",
    "LIIT",
    "LIPO",
    "LISP",
    "LTAM",
    "LTAF",
    "LTCO",
    "LTCS",
    "LTEU",
    "LTFR",
    "LTGM",
    "LTGK",
    "LTIT",
    "LTKO",
    "LTLA",
    "LTRU",
    "LTSP",
    "LTTH",
    "LTWR",
    "LTEN",
    "LTWL",
    "LTEA",
    "MMW ",
    "MBC ",
    "MATS",
    "MATH",
    "MSED",
    "MAE ",
    "MED ",
    "MCWP",
    "MUS ",
    "NANO",
    "NEU ",
    "NEUG",
    "OBG ",
    "OPTH",
    "ORTH",
    "PATH",
    "PEDS",
    "PHAR",
    "SPPS",
    "PHIL",
    "PHYS",
    "PHYA",
    "POLI",
    "PSY ",
    "PSYC",
    "RMAS",
    "RAD ",
    "MGTF",
    "MGT ",
    "MGTA",
    "MGTP",
    "RELI",
    "REV ",
    "SOMI",
    "SOMC",
    "SIOC",
    "SIOG",
    "SIOB",
    "SIO ",
    "SXTH",
    "SOCG",
    "SOCE",
    "SOCI",
    "SE  ",
    "SURG",
    "SYN ",
    "TDAC",
    "TDDE",
    "TDDR",
    "TDGE",
    "TDGR",
    "TDHT",
    "TDPW",
    "TDPR",
    "TMC ",
    "USP ",
    "UROL",
    "VIS ",
    "WARR",
    "WCWP",
    "WES",
  ];
  

  const navigate = useNavigate();

  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSearch(selectedOption);
    navigate("/results");
  };

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().indexOf(selectedOption.toLowerCase()) !== -1
  );

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="department-select">Select Department:</label>
      <input
        type="text"
        placeholder="Search..."
        value={selectedOption}
        onChange={handleSelect}
        list="department-options"
      />
      <datalist id="department-options">
        {filteredOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </datalist>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;