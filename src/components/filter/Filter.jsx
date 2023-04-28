import { memo, useState } from "react";
import { Accordion, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faRefresh } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import { formatDate } from "../../utils/helpers";
import styles from "./filter.module.css";

const sortOptions = [
  { label: "None", value: "" },
  { label: "A-Z", value: "a-z" },
  { label: "Z-A", value: "z-a" },
  { label: "Creation date oldest", value: "creation_date_oldest" },
  { label: "Creation date newest", value: "creation_date_newest" },
  { label: "Deadline date oldest", value: "completion_date_oldest" },
  { label: "Deadline date newest", value: "completion_date_newest" },
];

const statusOptions = [
  { label: "None", value: "" },
  { label: "Active", value: "active" },
  { label: "Done", value: "done" },
];

const dateOptions = [
  { label: "Created after", value: "create_gte" },
  { label: "Created before", value: "create_lte" },
  { label: "Deadline after", value: "complete_gte" },
  { label: "Deadline before", value: "complete_lte" },
];

const initialDateFilters = {
  create_lte: '',
  create_gte: '',
  complete_lte: '',
  complete_gte: '',
};

const initialOptionFilters = {
  status: "",
  sort: "",
};

function Filters(props) {
  const [search, setSearch] = useState('');
  const [optionFilters, setOptionFilters] = useState(initialOptionFilters);

  const [dateFilters, setDateFilters] = useState(initialDateFilters);

  const resetFilters = ()=>{
      setSearch('');
      setDateFilters(initialDateFilters);
      setOptionFilters(initialOptionFilters);
      props.onFilter({
        search: '',
        ...initialDateFilters,
        ...initialOptionFilters,
      });
  };

  const onFilterOptionChange = (name, value) => {
    setOptionFilters({
      ...optionFilters,
      [name]: value,
    })
  };

  const onSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const onDateChange = (name, date)=>{
    setDateFilters({
      ...dateFilters,
      [name]: formatDate(date)
    });
  };

  const onApplyFilters = ()=> {
    const filters = {
      search: search,
      ...dateFilters,
      ...optionFilters,
    }
    props.onFilter(filters);
  };

  return (
    <Accordion className="mb-4">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Form
            className={`${styles.form} d-flex`}
            onClick={(event) => event.stopPropagation()}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={onSearchChange}
            />
            <span
              className="btn btn-outline-success me-2"
              title="Apply filters"
              onClick={onApplyFilters}
            >
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <span 
            onClick={resetFilters}
            className="btn btn-outline-info" 
            title="Reset filters">
              <FontAwesomeIcon icon={faRefresh} 
              />
            </span>
          </Form>
        </Accordion.Header>
        <Accordion.Body>
          <Container fluid={true}>
            <Row>
            {dateOptions.map((dateOption) => {
              const dateValue = dateFilters[dateOption.value];
              return (
                <Col sm={6} md={4} lg={3} 
                className="text-center"
                key={dateOption.label}
                >
                <fieldset className={styles.filterItem}>
                  <legend>{dateOption.label}</legend>
                  <DatePicker
                    showIcon
                    selected={dateValue ? new Date(dateValue): ''}
                    onChange={(date)=>onDateChange(dateOption.value, date)}
                  />
                </fieldset>
              </Col>
              )
            })}
            </Row>
            <Row>
              <Col sm={6} className="text-center">
                <fieldset>
                  <legend>Status</legend>
                  <Form.Select 
                  onChange={(event)=>onFilterOptionChange('status', event.target.value)}
                  value={optionFilters.status}
                  >
                  {statusOptions.map((statusOption) => (
                      <option 
                      key={statusOption.label}
                      value={statusOption.value}
                      >
                        {statusOption.label}
                      </option>
                    )
                  )}
                  </Form.Select>
                </fieldset>
              </Col>
              <Col sm={6} className="text-center">
                <fieldset>
                  <legend>Sort</legend>
                  <Form.Select 
                  onChange={(event)=>onFilterOptionChange('sort', event.target.value)}
                  value={optionFilters.sort}
                  >
                    {sortOptions.map((sortOption) => (
                      <option 
                      key={sortOption.label}
                      value={sortOption.value}
                      >
                        {sortOption.label}
                      </option>
                    ))}
                  </Form.Select>
                </fieldset>
              </Col>
            </Row>
          </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

Filters.propTypes = {
  onFilter: PropTypes.func.isRequired,
}

export default memo(Filters);