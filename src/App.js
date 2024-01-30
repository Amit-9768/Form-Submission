import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }

  td {
    &:last-child {
      text-align: center;
    }
  }
`;

const EditDeleteButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const EditDeleteButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  background-color: ${(props) => (props.edit ? "#4CAF50" : "#f44336")};
  color: white;
  border: none;
  border-radius: 4px;
`;

const UpdatedButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
`;

const CloseButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
`;

const Modal = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  overflow: hidden;
`;

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    weekdays: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    gender: "",
    dob: "",
  });

  const [tableData, setTableData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? { ...prevData[name], [value]: checked } : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      console.log("testEdsit");
      // Edit mode
      const updatedTableData = [...tableData];
      updatedTableData[editIndex] = { ...formData };
      setTableData(updatedTableData);
      setEditIndex(null);
      setShowModal(false);
    } else {
      console.log("test");

      // Add mode
      setTableData([...tableData, { ...formData }]);
    }

    setFormData({
      name: "",
      email: "",
      contact: "",
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      gender: "",
      dob: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(tableData[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      contact: "",
      weekdays: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
      },
      gender: "",
      dob: "",
    });
  };

  return (
    <div>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FlexDiv>
            <div>
              <Label>Name:</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Email:</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Contact:</Label>
              <Input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
              />
            </div>
          </FlexDiv>
          <FlexDiv>
            <div>
              <Label>Weekdays:</Label>
              <div>
                {Object.entries(formData.weekdays).map(([day, checked]) => (
                  <Label key={day}>
                    <Input
                      type="checkbox"
                      name="weekdays"
                      value={day}
                      checked={checked}
                      onChange={handleInputChange}
                    />
                    {day.charAt(0).toUpperCase()}
                  </Label>
                ))}
              </div>
            </div>
            <div>
              <Label>Gender:</Label>
              <div>
                <Label>
                  <Input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                  />
                  Male
                </Label>
                <Label>
                  <Input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                  />
                  Female
                </Label>
              </div>
            </div>
          </FlexDiv>
          <div>
            <Label>Date of Birth:</Label>
            <Input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
            />
          </div>
          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
      </FormContainer>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Weekdays</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.contact}</td>
                <td>
                  {Object.entries(row.weekdays)
                    .filter(([, checked]) => checked)
                    .map(([day]) => day.charAt(0).toUpperCase())
                    .join(", ")}
                </td>
                <td>{row.gender}</td>
                <td>{row.dob}</td>
                <td>
                  <EditDeleteButtons>
                    <EditDeleteButton edit onClick={() => handleEdit(index)}>
                      Edit
                    </EditDeleteButton>
                    <EditDeleteButton onClick={() => handleDelete(index)}>
                      Delete
                    </EditDeleteButton>
                  </EditDeleteButtons>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      <Modal show={showModal}>
        <ModalContent>
          <h2>Edit Form</h2>
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <FlexDiv>
                <div>
                  <Label>Name:</Label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label>Contact:</Label>
                  <Input
                    type="number"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                  />
                </div>
              </FlexDiv>
              <FlexDiv>
                <div>
                  <Label>Weekdays:</Label>
                  <div>
                    {Object.entries(formData.weekdays).map(([day, checked]) => (
                      <Label key={day}>
                        <Input
                          type="checkbox"
                          name="weekdays"
                          value={day}
                          checked={checked}
                          onChange={handleInputChange}
                        />
                        {day.charAt(0).toUpperCase()}
                      </Label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Gender:</Label>
                  <div>
                    <Label>
                      <Input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === "male"}
                        onChange={handleInputChange}
                      />
                      Male
                    </Label>
                    <Label>
                      <Input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === "female"}
                        onChange={handleInputChange}
                      />
                      Female
                    </Label>
                  </div>
                </div>
              </FlexDiv>
              <div>
                <Label>Date of Birth:</Label>
                <Input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <UpdatedButton type="submit">Update</UpdatedButton>
            </form>
          </FormContainer>

          <CloseButton onClick={handleModalClose}>Close</CloseButton>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default App;
