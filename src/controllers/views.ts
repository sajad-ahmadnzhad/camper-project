import { NextFunction, Request, Response } from "express";

export const about = async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/about.ejs", { page: "" });
  try {
  } catch (error) {
    next(error);
  }
};
export const blog = async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/blog.ejs", { page: "blog" });
  try {
  } catch (error) {
    next(error);
  }
};
export const contact = async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/contact.ejs", { page: "contact" });
  try {
  } catch (error) {
    next(error);
  }
};
export const resume = async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/resume.ejs", { page: "resume" });
  try {
  } catch (error) {
    next(error);
  }
};
export const works = async (req: Request, res: Response, next: NextFunction) => {
  res.render("pages/website/works.ejs", { page: "works" });
  try {
  } catch (error) {
    next(error);
  }
};
