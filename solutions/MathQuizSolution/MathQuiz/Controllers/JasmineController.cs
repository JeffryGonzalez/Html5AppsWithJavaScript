using System;
using System.Web.Mvc;

namespace MathQuiz.Controllers
{
	public class JasmineController : Controller
	{
		public ViewResult Run(string specName)
		{
			return View(specName);
		}
	}
}
