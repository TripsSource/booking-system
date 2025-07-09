import { render, screen } from "@testing-library/react";
import Home from "./page"; // Update the path to the actual location of your component
import { useRouter } from "next/navigation"; // Import useRouter

// Mock the `useRouter` hook from next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Component", () => {
  it("should redirect to /dashboard on mount", () => {
    // Create a mock function for router.push
    const pushMock = jest.fn();

    // Mock the useRouter hook to return the mocked push function
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    // Render the component
    render(<Home />);

    // Assert that router.push was called with "/dashboard"
    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });
});
