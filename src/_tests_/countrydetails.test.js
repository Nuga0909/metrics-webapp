import React from "react";
import { render } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CountryDetails from "../components/CountryDetails";

jest.mock("react-redux");
jest.mock("react-router-dom");

describe("CountryDetails", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockReturnValue({
      isLoading: false,
      country: [],
    });
    useParams.mockReturnValue({ countryId: "1" });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<CountryDetails />);
  });

  it("displays loading when data is being fetched", () => {
    useSelector.mockReturnValue({ isLoading: true, country: [] });
    const { getByText } = render(<CountryDetails />);
    expect(getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays country details when data is available", () => {
    const mockData = {
      isLoading: false,
      country: [
        {
          flag: { svg: "test.svg" },
          countryName: "TestCountry",
          currencies: [{ name: "TestCurrency" }],
          capital: "TestCapital",
          area: "TestArea",
          population: 1000,
          borders: ["TestBorder"],
          languages: [{ name: "TestLanguage" }],
          nativeName: "TestNativeName",
          timezones: ["TestTimezone"],
        },
      ],
    };

    useSelector.mockReturnValue(mockData);
    const { getByText } = render(<CountryDetails />);

    expect(getByText("TestCountry")).toBeInTheDocument();
    expect(getByText("TestCurrency")).toBeInTheDocument();
    // ... Continue checks for other fields
  });

  // Add more tests as needed.
});
