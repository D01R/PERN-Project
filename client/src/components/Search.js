import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Context } from "../index";

const Search = observer(() => {
    const {workspace} = useContext(Context)

    return(
        <InputGroup className="mt-3 mb-3">
            <InputGroup.Text id='search'>search</InputGroup.Text>
            <Form.Control
                placeholder="Enter query"
                aria-label="query"
                aria-describedby="search"
                onChange={(e) => workspace.setQ(e.target.value)}
            />
        </InputGroup>
    )
})

export default Search